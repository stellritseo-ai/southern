// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
    externals: {
      inline: ["mongodb", "cloudinary"],
      traceInclude: ["mongodb", "cloudinary"],
    },
  } as any,
  vite: {
    server: {
      port: 8081,
    },
    plugins: [
      {
        name: "api-server",
        async configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith("/api/")) {
              try {
                const { handleNodeApiRequest } = await import("./src/lib/api-handler.server");
                const handled = await handleNodeApiRequest(req, res);
                if (handled) return;
              } catch (err) {
                console.error("Vite dev API error:", err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: String(err) }));
                return;
              }
            }
            next();
          });

          if (server.httpServer) {
            try {
              const { Server } = await import("socket.io");
              const io = new Server(server.httpServer, {
                cors: {
                  origin: "*",
                  methods: ["GET", "POST"]
                }
              });
              (global as any).io = io;

              io.on("connection", (socket) => {
                socket.on("join-session", (sessionId) => {
                  socket.join(sessionId);
                });

                socket.on("send-message", (data) => {
                  // data: { sessionId, sender, text, timestamp }
                  io.to(data.sessionId).emit("message", data);
                  io.emit("new-chat-message", data);
                });

                socket.on("session-created", (data) => {
                  // data: { sessionId, clientName }
                  io.emit("session-created", data);
                });
              });

              console.log("⚡ [Socket.io] Dev Server initialized successfully");
            } catch (err) {
              console.error("Failed to start Socket.io server:", err);
            }
          }
        },
      },
    ],
    build: {
      rollupOptions: {
        external: ["dns", "aws4", "snappy", "kerberos", "tls", "net", "node:async_hooks", "async_hooks", "crypto", "node:crypto", "socket.io"],
      },
    },
  },
});
