export const updateUser =
    (user) => {
                return { 
                        type: 'UPDATE_USER_ACTION', 
                        user: user 
                       };
              }

export const updateCardList =
    (cardList) => {
                return {
                    type : 'UPDATE_CARD_LIST',
                    cardList: cardList
                };
    };

export const updateSelectedCard =
    (card) => {
                return {
                    type : 'UPDATE_SELECTED_CARD',
                    card: card
                };
    };

export const updateHp =
    (players_hp) => {
                return {
                    type : 'UPDATE_PLAYERS_HP',
                    players_hp: players_hp
                };
    };

export const updateGameData =
    (gameData) => {
                return {
                    type : 'UPDATE_GAME_DATA',
                    gameData: gameData
                };
    };