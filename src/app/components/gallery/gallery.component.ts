import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  currentImg: string = '';

  openImage(event: MouseEvent) {
    this.currentImg = (event.target as HTMLImageElement).src;
    console.log(this.currentImg);
  }
}
