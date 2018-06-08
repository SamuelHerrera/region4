import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  msgs: Message[] = [];
  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    setTimeout(() => {
      document.getElementById("cerrar").style.display = "none";
    }, 3000);
  }
  close() {
    document.getElementById("cerrar").style.display = "none";
  }

}
