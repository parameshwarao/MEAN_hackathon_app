import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ipl-match';
  
  constructor() {
    window.addEventListener('scroll', this.scroll, true); 
		
  }
  topFunction(){
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
  }

  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}


scroll = (): void => {

  this.scrollFunction();
  //handle your scroll here
  //notice the 'odd' function assignment to a class field
  //this is used to be able to remove the event listener
};
  



}
