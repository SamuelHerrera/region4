import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ClientService } from '../../services/client.service';
@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource([]);

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe((response: any) => {
      console.log(response)
      this.dataSource = new MatTableDataSource(response.data.docs);
    });
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
