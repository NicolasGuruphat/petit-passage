class CursorSync {
    constructor(serverUrl) {
        this.serverUrl = serverUrl;
        this.cursors = {};
        this.clientId = localStorage.getItem('cursorSyncClientId');
        if (!this.clientId) {
            this.clientId = this.generateUniqueId();
            localStorage.setItem('cursorSyncClientId', this.clientId);
        }
        this.loadSocketIO().then(() => this.init());
    }

    generateUniqueId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    async loadSocketIO() {
        if (typeof io === "undefined") {
            await new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.4/socket.io.js";
                script.onload = resolve;
                document.head.appendChild(script);
            });
        }
    }

    init() {
        this.socket = io(this.serverUrl);

        // Envoi de l'ID client avec les mouvements
        document.addEventListener("mousemove", (event) => {
            this.socket.emit("mousemove", {
                x: event.clientX,
                y: event.clientY,
                id: this.clientId // Utilisation de l'ID client
            });
        });

        // Notification de déconnexion avant déchargement de la page
        window.addEventListener('beforeunload', () => {
            this.socket.emit("client_disconnect", { id: this.clientId });
        });

        // Écoute des événements
        this.socket.on("mousemove", (data) => this.updateCursor(data));
        this.socket.on("remove_cursor", (data) => this.removeCursor(data.id)); // Nouvel événement
        console.log("CursorSync initialisé");
    }

    updateCursor(data) {
        if (!this.cursors[data.id]) this.createCursor(data.id);
        this.moveCursor(data.id, data.x, data.y);
    }

    createCursor(id) {
        const cursor = document.createElement("div");
        cursor.classList.add("cursor-sync");
        Object.assign(cursor.style, {
            position: "absolute",
            width: "10px",
            height: "10px",
            backgroundColor: "red",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: "9999",
        });
        document.body.appendChild(cursor);
        this.cursors[id] = cursor;
    }

    moveCursor(id, x, y) {
        if (this.cursors[id]) {
            this.cursors[id].style.transform = `translate(${x}px, ${y}px)`;
        }
    }

    removeCursor(id) {
        if (this.cursors[id]) {
            this.cursors[id].remove();
            delete this.cursors[id];
        }
    }
}

// Auto-instanciation si `cursorsync.js` est inclus dans la page
window.cursorSync = new CursorSync("https://api.petit-passage.com");

