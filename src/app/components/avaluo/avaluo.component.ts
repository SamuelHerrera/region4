import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-avaluo',
  templateUrl: './avaluo.component.html',
  styleUrls: ['./avaluo.component.css'],
  providers: [
    { provide: 'Window', useValue: window }
  ]
})
export class AvaluoComponent implements OnInit {

  /*Todo lo que incluye el stepper*/
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  /* */

  selectedAge: string[] = [];

  constructor(private _formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
