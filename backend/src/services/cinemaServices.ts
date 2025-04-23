import CinemaModel from "../models/cinemaModel";

export const getAllCinemas = async () => {
  return await CinemaModel.find();
};

export const seedInitialCinema = async () => {
  try {
    const Cinema = [
      {movie_id: "1",
      titleImg: "/movies/dune-2-title.png",
      bgImg: "/movies/bg-dune-2.jpeg",
      previewImg: "/movies/dune-2.png",
      video: "https://www.youtube.com/embed/Way9Dexny3w",
      title: "Dune: Part Two",
      year: "2024",
      date: "1st March",
      ageLimit: "PG-13",
      length: "2h 46min",
      category: "Sci-Fi",
      locations: [
        {
          city: "Cairo",
          cinemas: [
            {
              name: "Vox Cinemas, Cairo Festival City",
              showtimes: {
                "2025-03-10": ["1:00 PM", "4:30 PM", "8:00 PM"],
                "2025-03-11": ["2:00 PM", "6:00 PM"],
                "2025-03-12": ["3:00 PM", "7:00 PM"]
              }
            },
            {
              name: "Point 90 Cinema",
              showtimes: {
                "2025-03-10": ["12:00 PM", "3:30 PM", "7:30 PM"],
                "2025-03-11": ["1:30 PM", "5:00 PM"],
                "2025-03-12": ["4:00 PM", "8:00 PM"]
              }
            }
          ]
        }
      ],
      description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.",
      active: true,
      price: 150,
      stock: 1000
    },
    {
      movie_id: "2",
      titleImg: "/movies/meg-2-title.png",
      bgImg: "/movies/bg-meg-2.jpg",
      previewImg: "/movies/meg-2.jpg",
      video: "https://www.youtube.com/embed/dG91B3hHyY4?si=JcEDpwnIeU-GQM7y" ,
      title: "Meg 2: The Trench",
      year: "2023",
      date: "4th August",
      ageLimit: "16+",
      length: "1h 56min",
      category: "Thriller",
      locations: [
        {
          city: "Giza",
          cinemas: [
            {
              name: "Galaxy Cinema, Mall of Egypt",
              showtimes: {
                "2025-03-10": ["3:00 PM", "6:00 PM", "9:00 PM"],
                "2025-03-11": ["2:00 PM", "5:00 PM"],
                "2025-03-12": ["4:00 PM", "8:30 PM"]
              }
            }
          ]
        }
      ],
      description: "Jonas Taylor leads a research team on an exploratory dive into the deepest depths of the ocean.",
      active: false,
      price: 150,
      stock: 1000
    },
    {
      movie_id: "3",
      titleImg: "/movies/deadpool-3-title.png",
      bgImg: "/movies/bg-deadpool-3.jpg",
      previewImg: "/movies/deadpool-3.jpg",
      video: "https://www.youtube.com/embed/73_1biulkYk?si=RpErsRXaqkOXms1q",
      title: "Deadpool 3",
      year: "2024",
      date: "26th July",
      ageLimit: "+18",
      length: "2h 5min",
      category: "Action",
      locations: [
        {
          city: "Alexandria",
          cinemas: [
            {
              name: "Vox Cinemas, Mall of Arabia",
              showtimes: {
                "2025-03-10": ["2:00 PM", "5:00 PM", "8:30 PM"],
                "2025-03-11": ["1:30 PM", "4:00 PM"],
                "2025-03-12": ["3:30 PM", "7:30 PM"]
              }
            }
          ]
        }
      ],
      description: "Deadpool and Wolverine team up in this highly anticipated Marvel action-comedy sequel.",
      active: false,
      price: 150,
      stock: 1000
    },
    {
      movie_id: "4",
      titleImg: "/movies/oppenheimer-title.png",
      bgImg: "/movies/bg-oppenheimer.jpeg",
      previewImg: "/movies/oppenheimer.jpg",
      video: "https://www.youtube.com/embed/uYPbbksJxIg",
      title: "Oppenheimer",
      year: "2023",
      date: "21st July",
      ageLimit: "+18",
      length: "3h 0min",
      category: "Biography",
      locations: [
        {
          city: "Cairo",
          cinemas: [
            {
              name: "IMAX, Cairo Festival City",
              showtimes: {
                "2025-03-10": ["12:30 PM", "4:30 PM", "8:30 PM"],
                "2025-03-11": ["3:00 PM", "7:00 PM"],
                "2025-03-12": ["5:00 PM", "9:00 PM"]
              }
            }
          ]
        }
      ],
      description: "The story of J. Robert Oppenheimer and the Manhattan Project that led to the creation of the atomic bomb.",
      active: false,
      price: 150,
      stock: 1000
    },
    {
      movie_id: "5",
      titleImg: "/movies/venom-last-dance-title.png",
      bgImg: "/movies/bg-venom-last-dance.jpeg",
      previewImg: "/movies/venom-last-dance.jpg",
      video: "https://www.youtube.com/embed/__2bjWbetsA?si=8uaAPNL8O39xPm9O",
      title: "Venom: The Last Dance",
      year: "2024",
      date: "24th October",
      ageLimit: "PG-13",
      length: "1h 50min",
      category: "Action",
      locations: [
        {
          city: "Cairo",
          cinemas: [
            {
              name: "Vox Cinemas, Mall of Egypt",
              showtimes: {
                "2025-03-10": ["5:00 PM", "9:00 PM"],
                "2025-03-11": ["7:00 PM"],
                "2025-03-12": ["4:30 PM", "8:30 PM"]
              }
            }
          ]
        }
      ],
      description: "Eddie and Venom are on the run, hunted by both of their worlds, forcing them into a devastating decision that will bring their final dance to an end.",
      active: false,
      price: 150,
      stock: 1000
    },
    {
      movie_id: "6",
      titleImg: "/movies/el-hareefa-2-title.png",
      bgImg: "/movies/bg-el-hareefa-2.jpg",
      previewImg: "/movies/el-hareefa-2.jpg",
      video: "https://www.youtube.com/embed/iny7249Z6AQ",
      title: "El Hareefa 2",
      year: "2024",
      date: "4th December",
      ageLimit: "G",
      length: "2h 0min",
      category: "Comedy",
      locations: [
        {
          city: "Alexandria",
          cinemas: [
            {
              name: "San Stefano Cinema",
              showtimes: {
                "2025-03-10": ["1:00 PM", "4:00 PM", "7:00 PM"],
                "2025-03-11": ["3:00 PM", "6:00 PM"],
                "2025-03-12": ["5:00 PM", "8:30 PM"]
              }
            }
          ]
        }
      ],
      description: "The sequel continues the journey of a young football star rising to prominence amidst challenges and triumphs.",
      active: false,
      price: 150,
      stock: 1000
    },
    {
        movie_id: "7",
        titleImg: "/movies/welad-rizk-3-title.png",
        bgImg: "/movies/bg-welad-rizk.jpg",
        previewImg: "/movies/welad-rizk-3.jpg",
        video: "https://www.youtube.com/embed/DD5SvLL3rso",
        title: "Welad Rizk 3",
        year: "2024",
        date: "12 June",
        ageLimit: "16+",
        length: "2h 5min",
        category: "Action",
        locations: [
          {
            city: "Cairo",
            cinemas: [
              {
                name: "Renaissance Cinema, Downtown",
                showtimes: {
                  "2025-03-10": ["2:30 PM", "6:00 PM", "9:30 PM"],
                  "2025-03-11": ["5:00 PM", "8:00 PM"],
                  "2025-03-12": ["4:00 PM", "7:30 PM"]
                }
              },
              {
                name: "Point 90 Cinema",
                showtimes: {
                  "2025-03-10": ["3:00 PM", "7:00 PM"],
                  "2025-03-11": ["6:00 PM", "9:00 PM"],
                  "2025-03-12": ["2:30 PM", "8:00 PM"]
                }
              }
            ]
          }
        ],
        description: "After many years, the brothers have chosen different paths in life. However, a ghost from the past reappears one day to cast a shadow over Rizk's boys, compelling them to return to a life of crime and theft to save themselves in their history's riskiest and most crucial operation.",
        active: false,
        price: 150,
      stock: 1000
      }

    ];

    const existingCinema = await getAllCinemas();
    if (existingCinema.length === 0) {
      await CinemaModel.insertMany(Cinema);
    }
  } catch (err) {
    console.error("Cannot see database ", err);
  }
};
