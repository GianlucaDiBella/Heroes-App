const { heroes } = require("../data/heroes");


export const getHeroesById = (id) => {

    return heroes.find( heroe => heroe.id === id)

}

