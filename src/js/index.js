import '../css/app.scss';
import Character from './characters';

class App {
    constructor () {
        this.initApp();
    }

    initApp () {
        // Start application
        new Character();
    }
}

new App();