// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI as string;

// const connect = async (): Promise<void> => {
//   const connectionState = mongoose.connection.readyState;

//   if (connectionState === 1) {
//     console.log('Already connected');
//     return;
//   }
//   if (connectionState === 2) {
//     console.log('Connecting...');
//     return;
//   }

//   try {
//     await mongoose.connect(MONGODB_URI, {
//       dbName: 'ddd',
//       bufferCommands: false,
//       useNewUrlParser: true,      // Add this option to handle URL string parsing
//       useUnifiedTopology: true,   // Add this option to use the new Server Discover and Monitoring engine
//     });
//     console.log('Connected');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', (error as Error).message);
//   }
// };

// export default connect;
