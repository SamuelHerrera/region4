import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { YalsService } from './services/yals.service';
import { YalsRequest } from './models/yals.model';
import { PagofacilService } from './services/pagofacil.service';
import { Pagofacilrequest } from './models/pagofacil.model';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    /*let algo = this.getBase64ImageFromURL('https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=13&size=310x310&maptype=roadmap&format=png&visual_refresh=true');
    //console.log(algo);
    
    algo.subscribe(response => {
      console.log(response);
    });*/
  }

  /*getBase64ImageFromURL(url) {
    let canvas, ctx, img, dataURL, newImage;

    canvas = document.createElement("canvas");
    ctx = canvas.getContext('2d');

    img = new Image();
    img.src = url;

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    }

    dataURL = canvas.toDataURL("image/png");

    //newImage = document.createElement("canvas");
    console.log(dataURL);
    let algo: any = document.getElementById("imagen");
    algo.src = dataURL;
    //newImage.src = dataURL;
  }*/
  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.setAttribute("crossOrigin",'anonymous');
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }



  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

}
