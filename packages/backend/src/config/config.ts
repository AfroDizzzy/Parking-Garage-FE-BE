interface Config {
  port: number;
  cors: {
    origin: string;
    credentials: boolean;
  };
  app: {
    name: string;
    version: string;
  };
  booking: {
    maxNotesLength: number;
    upcomingDaysRange: number;
  };
}

const config: Config = {
  port: parseInt(process.env.PORT || "3001", 10),
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },
  app: {
    name: "Car Park Booking API",
    version: "1.0.0",
  },
  booking: {
    maxNotesLength: 500,
    upcomingDaysRange: 30,
  },
};

export default config;
