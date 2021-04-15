import $ from 'jquery';
import CharacterTemplate from './hbs/character.hbs';

export default class Character {

    constructor () {
        this.initEls();
        this.initEvents();
    }

    initEls () {
        this.$els = {
            container: $('.js-container'),
            button: $('.js-loadmore'),
            status: $('.js-status'),
            search: $('.js-search')
        };
        this.loadData = 8
        this.searchValue = ""
    }

    initEvents () {
        this.getCharacters(this.loadData, this.searchValue);
        this.pressButton();
        this.inputValue();
    }

    getCharacters(loadData, searchValue) {
        const api = {
            endpoint: 'https://finalspaceapi.com/api/v0/character'
        };
        $.ajaxSetup({cache: false});
        $.getJSON(api.endpoint)
            .then((response) => {
                this.renderCharacter(response, loadData, searchValue);
            })
            .catch((err) => {
                console.log('Error Character', err);
            });
    }

    pressButton() {
        this.$els.button.click(() => {
            this.loadData += 8;
            this.getCharacters(this.loadData, this.searchValue)
        })
    }

    inputValue() {
        this.$els.search.on('input', (value) => {
            this.searchValue = value.currentTarget.value
            this.loadData = 8
            this.getCharacters(this.loadData, this.searchValue)
        })
    }

    colorStatus() {
        let characters = document.querySelectorAll('.character_card')
        characters.forEach((char) => {
          let status = char.querySelector('.js-status')
          let statusColor = char.querySelector('.color-status')
          let pulseColor = char.querySelector('.color-pulse')
          let statusContent = status.innerText
          if(statusContent.includes("Alive")){
            statusColor.style.backgroundColor = "green"
            pulseColor.style.backgroundColor = "green"
            status.style.color = "green"
          } else if (statusContent.includes("Deceased")) {
            statusColor.style.backgroundColor = "red"
            pulseColor.style.backgroundColor = "red"
            status.style.color = "red"
          } else if (statusContent.includes("Operational")){
            statusColor.style.backgroundColor = "blue"
            pulseColor.style.backgroundColor = "blue"
            status.style.color = "blue"
          } else {
            statusColor.style.backgroundColor = "orange"
            pulseColor.style.backgroundColor = "orange"
            status.style.color = "orange"
          }
    })
}



    renderCharacter (characterData, loadData, searchValue) {
        this.$els.container.empty()
        this.$els.button.css("display" , "block")

        for(let i=0 ; i<loadData ; i++){

            if (loadData >= characterData.length) {
                this.$els.button.css("display" , "none")
            }

            const characterName = characterData[i].name;
            const characterImage = characterData[i].img_url;
            const characterStatus = characterData[i].status;
            const characterSpecies = characterData[i].species;
            const characterGender = characterData[i].gender;
            const characterOrigin = characterData[i].origin;

            if(searchValue != "") {
               let searchLower =searchValue.toLowerCase()
               let nameLower = characterName.toLowerCase()
            
                if (nameLower.includes(searchLower)) {
                    const character = CharacterTemplate({name: characterName, image: characterImage, status: characterStatus, species: characterSpecies, gender: characterGender, origin: characterOrigin});
                    this.$els.container.append(character);
                } else {
                    loadData++
                }
            } else {
                const character = CharacterTemplate({name: characterName, image: characterImage, status: characterStatus, species: characterSpecies, gender: characterGender, origin: characterOrigin});
                this.$els.container.append(character);
            }

        }

        this.colorStatus()

    }
}