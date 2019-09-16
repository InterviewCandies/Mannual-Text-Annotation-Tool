// Main App
// Use DI to inject server and database as classes
class App {
  constructor({ server, database }) {
    this.server = server;
    this.database = database;
  }

  async start() {
    // Start server
    await this.server.start()
    // Connect to database
    // await this.database.connect();
  }
}

module.exports = App;
