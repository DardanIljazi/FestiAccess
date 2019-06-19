import {AfterContentInit, Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {User} from '../models/User';
import {ConnectedUser} from "../models/ConnectedUser";

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage extends FestiAccessPage implements OnInit {
    user: User;

    constructor(injector: Injector) {
        super(injector);
        this.dataProvider.getFromMemoryOrStorageCache(ConnectedUser)
            .then((data) => {
                this.user = data;
                console.log(this.user);
            })
            .catch((error) => {
                this.showMessage('Erreur: ' + error);
            });
    }

    ngOnInit(): void {

    }

}

