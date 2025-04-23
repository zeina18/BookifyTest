import SportModel from "../models/sportModel";

export const getAllSports = async () => {
  return await SportModel.find();
};

export const seedInitialSport = async () => {
  try {
    const Sport = [
      {
        team1: "Al Ahly SC",
        team2: "Pyramids FC",
        tournament: "EPL 2024/2025",
        stage:"Week 12",
        stadium: "Cairo Int. Stadium",
        city: "Cairo",
        date: "Thu 27 Feb 2025",
        time: "09:30 PM",
        status: "closed",
        
      },

      {
        team1: "Pyramids FC",
        team2: "Zamalek SC",
        tournament: "EPL 2024/2025",
        stage:"Week 15",
        stadium: "30 June Stadium",
        city: "Cairo",
        date: "Tue 8 Mar 2025",
        time: "09:30 PM",
        status: "available",
        
      },

      {
        team1: "Al Ahly SC",
        team2: "Zamalek SC",
        tournament: "EPL 2024/2025",
        stage:"Week 16",
        stadium: "Cairo Int. Stadium",
        city: "Cairo",
        date: "Tue 11 Mar 2025",
        time: "09:30 PM",
        status: "available",
        
      },


      {
        team1: "Zamalek SC",
        team2: "Al Ittihad Al Sakandary",
        tournament: "EPL 2024/2025",
        stage:"Week 17",
        stadium: "Cairo Int. Stadium",
        city: "Cairo",
        date: "Fri 14 Mar 2025",
        time: "09:30 PM",
        status: "available",
        
      },

      {
        team1: "Ghazl El Mahalla SC",
        team2: "Al Ahly SC",
        tournament: "EPL 2024/2025",
        stage:"Week 17",
        stadium: "Ghazl El Mahalla Stadium",
        city: "El Mahalla",
        date: "Sat 15 Mar 2025",
        time: "08:30 PM",
        status: "available",
        
      },

      {
        team1: "Al Ittihad Al Sakandary",
        team2: "Ghazl El Mahalla SC",
        tournament: "EPL 2024/2025",
        stage:"Week 19",
        stadium: "Alexandria Stadium",
        city: "Alex",
        date: "Fri 21 Mar 2025",
        time: "08:30 PM",
        status: "available",
        
      },

      

      
      

      
      
    ];

    const existingSport = await getAllSports();
    if (existingSport.length === 0) {
      await SportModel.insertMany(Sport);
    }
  } catch (err) {
    console.error("Cannot see database ", err);
  }
};
