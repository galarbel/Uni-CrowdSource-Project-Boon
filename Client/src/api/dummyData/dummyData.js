export const dummyData = {

    LoginOK: {
        code: 200,
        data: {
            login: true,
            username: "gala",
            password: "1234"
        }
    },

    checkUserNamePassword: {
        code: 200,
        data: {
            isAvailable: true
        }
    },

    GameOfTags: {
        code: 200,
        data: {
            itemId: 123,
            type: 1,
            tag: "Pokemon",
            img: "http://cdn.bulbagarden.net/upload/thumb/b/b1/151Mew.png/250px-151Mew.png",
            desc: "this is mew"
        }
    },

    GameOfTags2: {
        code: 200,
        data: {
            itemId: 124,
            type: 2,
            img: "http://www.ikea.com/PIAimages/0406160_PE569308_S5.JPG",
            desc: "Woof!"
        }
    },

    GameOfTags3: {
        code: 200,
        data: {
            itemId: 124,
            type: 1,
            tag: "Tembel",
            img: "http://cdn.timesofisrael.com/uploads/2015/11/Oren-Hazan1-e1448585265637.jpg",
            desc: "...."
        }
    },

    suggestionTags: {
        code: 200,
        data: {
            suggestionTags: ["Pokemon", "Chair", "Tag1", "Tag2"]
        }
    }
};
