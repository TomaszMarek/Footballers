const players = [
    {
        Surname: 'Lewandowski',
        Age: 32,
        Position: 'Forward',
        Club: 'FC Barcelona',
        Goals: 30,
        Assists: 10,
        Height: 185,

    },
    {
        Surname: 'Ronaldo',
        Age: 36,
        Position: 'Forward',
        Club: 'Manchester United',
        Goals: 25,
        Assists: 5,
        Height: 187,
       
    },
    {
        Surname: 'Messi',
        Age: 34,
        Position: 'Forward',
        Club: 'Paris Saint-Germain',
        Goals: 28,
        Assists: 12,
        Height: 170,
    },
    {
        Surname: 'Neymar',
        Age: 29,
        Position: 'Forward',
        Club: 'Paris Saint-Germain',
        Goals: 20,
        Assists: 15,
        Height: 175,

    },
    {
        Surname: 'Mbappe',
        Age: 22,
        Position: 'Forward',
        Club: 'Paris Saint-Germain',
        Goals: 24,
        Assists: 11,
        Height: 178,

    },
    {
        Surname: 'Haaland',
        Age: 21,
        Position: 'Forward',
        Club: 'Borussia Dortmund',
        Goals: 27,
        Assists: 8,
        Height: 194,
       
    },
    {
        Surname: 'Kane',
        Age: 28,
        Position: 'Forward',
        Club: 'Tottenham Hotspur',
        Goals: 23,
        Assists: 14,
        Height: 188,

    },
    {
        Surname: 'De Bruyne',
        Age: 30,
        Position: 'Midfielder',
        Club: 'Manchester City',
        Goals: 10,
        Assists: 18,
        Height: 181,

    },
    {
        Surname: 'Salah',
        Age: 29,
        Position: 'Forward',
        Club: 'Liverpool',
        Goals: 22,
        Assists: 9,
        Height: 175,

    },
    {
        Surname: 'Mane',
        Age: 29,
        Position: 'Forward',
        Club: 'Liverpool',
        Goals: 18,
        Assists: 7,
        Height: 174,

    },
    {
        Surname: 'Jorginho',
        Age: 30,
        Position: 'Midfielder',
        Club: 'Chelsea',
        Goals: 8,
        Assists: 6,
        Height: 180,

    },
    {
        Surname: 'Lukaku',
        Age: 28,
        Position: 'Forward',
        Club: 'Chelsea',
        Goals: 15,
        Assists: 5,
        Height: 191,

    },
    {
        Surname: 'Fernandes',
        Age: 27,
        Position: 'Midfielder',
        Club: 'Manchester United',
        Goals: 18,
        Assists: 12,
        Height: 179,

    },
    {
        Surname: 'Pogba',
        Age: 28,
        Position: 'Midfielder',
        Club: 'Manchester United',
        Goals: 6,
        Assists: 9,
        Height: 191,

    },
    {
        Surname: 'Vardy',
        Age: 34,
        Position: 'Forward',
        Club: 'Leicester City',
        Goals: 19,
        Assists: 6,
        Height: 178,

    },
    {
        Surname: 'Grealish',
        Age: 25,
        Position: 'Midfielder',
        Club: 'Manchester City',
        Goals: 7,
        Assists: 10,
        Height: 175,

    },
    {
        Surname: 'Sterling',
        Age: 26,
        Position: 'Forward',
        Club: 'Manchester City',
        Goals: 12,
        Assists: 7,
        Height: 170,

    },
    {
        Surname: 'Son',
        Age: 29,
        Position: 'Forward',
        Club: 'Tottenham Hotspur',
        Goals: 17,
        Assists: 10,
        Height: 183,

    },
    {
        Surname: 'Rashford',
        Age: 23,
        Position: 'Forward',
        Club: 'Manchester United',
        Goals: 11,
        Assists: 8,
        Height: 180,
       
    },
    {
        Surname: 'Sancho',
        Age: 21,
        Position: 'Forward',
        Club: 'Manchester United',
        Goals: 9,
        Assists: 11,
        Height: 180,
       
    },
    {
        Surname: 'Martinez',
        Age: 23,
        Position: 'Forward',
        Club: 'Inter Milan',
        Goals: 17,
        Assists: 5,
        Height: 174,
       
    },
    {
        Surname: 'Dybala',
        Age: 27,
        Position: 'Forward',
        Club: 'Juventus',
        Goals: 14,
        Assists: 9,
        Height: 177,
       
    },
    {
        Surname: 'Lukaku',
        Age: 28,
        Position: 'Forward',
        Club: 'Chelsea',
        Goals: 15,
        Assists: 5,
        Height: 191,

    },
    {
        Surname: 'Muller',
        Age: 31,
        Position: 'Midfielder',
        Club: 'Bayern Munich',
        Goals: 13,
        Assists: 15,
        Height: 186,

    },
    {
        Surname: 'Kimmich',
        Age: 26,
        Position: 'Midfielder',
        Club: 'Bayern Munich',
        Goals: 6,
        Assists: 10,
        Height: 176,

    },
    {
        Surname: 'Benzema',
        Age: 33,
        Position: 'Forward',
        Club: 'Real Madrid',
        Goals: 23,
        Assists: 9,
        Height: 185,
       
    },
    {
        Surname: 'Modric',
        Age: 36,
        Position: 'Midfielder',
        Club: 'Real Madrid',
        Goals: 3,
        Assists: 8,
        Height: 172,

    },
    {
        Surname: 'Griezmann',
        Age: 30,
        Position: 'Forward',
        Club: 'Atletico Madrid',
        Goals: 15,
        Assists: 7,
        Height: 176,

    },
    {
        Surname: 'Suarez',
        Age: 34,
        Position: 'Forward',
        Club: 'Atletico Madrid',
        Goals: 21,
        Assists: 5,
        Height: 182,

    },
    {
        Surname: 'Ramos',
        Age: 35,
        Position: 'Defender',
        Club: 'Paris Saint-Germain',
        Goals: 5,
        Assists: 2,
        Height: 184,

    },
    {
        Surname: 'Pique',
        Age: 34,
        Position: 'Defender',
        Club: 'FC Barcelona',
        Goals: 2,
        Assists: 1,
        Height: 194,

    },
    {
        Surname: 'Glik',
        Age: 30,
        Position: 'Defender',
        Club: 'Monaco',
        Goals: 4,
        Assists: 1,
        Height: 193,

    },
    {
        Surname: 'Chiellini',
        Age: 36,
        Position: 'Defender',
        Club: 'Juventus',
        Goals: 1,
        Assists: 1,
        Height: 187,

    },
    {
        Surname: 'Maguire',
        Age: 28,
        Position: 'Defender',
        Club: 'Manchester United',
        Goals: 2,
        Assists: 1,
        Height: 204,

    }
];

module.exports = players;
