import {Component, Injector, OnInit} from '@angular/core';
import {FestiAccessPage} from '../extends/festi-access-page';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import {DataProviderEnum} from '../../providers/data';
import {APIResource} from '../implements/apiresource';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.page.html',
    styleUrls: ['./connection.page.scss'],
})

export class ConnectionPage extends FestiAccessPage implements OnInit, APIResource {

    constructor(private fingerPrint: FingerprintAIO, injector: Injector) {
        super('/connection', injector);
    }

    ngOnInit() {

    }

    connect() {
        this.startLoading();

        this.fingerPrint.show({
            clientId: 'FestiAccess',
            clientSecret: 'o7aoOMYUbyxaD23oFAnJ',
            disableBackup: true,
            localizedFallbackTitle: 'FestiAccess authentication',
            localizedReason: 'FestiAccess authentication'
        })
            .then((result: any) => {

                console.log('result: ' + result);
                console.log('finished');
                this.dataProvider.sendAndWaitResponse(this.API_URL, this.API_PATH, DataProviderEnum.Post, this.apiResource(result));
                this.stopLoading();
            })
            .catch((error: any) => console.log('error: ' + error));
    }

    apiResource(hash: string): string {
        return JSON.stringify({
                fingerPrintHash: hash
            }
        );
    }

}
