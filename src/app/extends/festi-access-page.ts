import {Router} from '@angular/router';
import {DataProvider} from '../../providers/data';
import {Navigation} from '../implements/navigation';
import {Injector} from '@angular/core';
import {LoadingService} from '../../providers/loading';
import {ToastService} from '../../providers/toast';

export abstract class FestiAccessPage implements Navigation {
    protected dataProvider: DataProvider;
    protected router: Router;
    protected loadingService: LoadingService;
    protected toastService: ToastService;
    private actualPage: string;

    protected constructor(injector: Injector, API_PATH = null) {
        this.dataProvider = injector.get(DataProvider);
        this.router = injector.get(Router);
        this.loadingService = injector.get(LoadingService);
        this.toastService = injector.get(ToastService);

        if (API_PATH !== null) {
            this.dataProvider.apiService.API_PATH = API_PATH;
        }
    }

    goTo(link): void {
        this.router.navigate([link]).then(() => {
            console.log('Going to page: ' + link);
            this.actualPage = link;
        }).catch(() => {
            console.log('goTo for ' + link + ' didn\'t work');
        });
    }

    backHome() {
        this.goTo('home');
    }

    startLoading() {
        this.loadingService.present().then();
    }

    stopLoading() {
        this.loadingService.dismiss().then();
    }

    showMessage(message: string, duration: number = 2000, buttons: object = null) {
        let buttonsObject = [];
        if (buttons !== null) {
            buttons.forEach((object) => {
                buttonsObject.push({
                    text: object.text,
                    handler: object.action
                });
            });
        }

        this.toastService.presentToast(message, duration, buttonsObject).then();
    }
}


