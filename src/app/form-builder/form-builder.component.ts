import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormBuilderService } from '../form-builder.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  form: FormGroup;
  showFieldOptions: boolean = false;
  selectedFieldType: string = ''; 

  constructor(private fb: FormBuilder, private formBuilderService: FormBuilderService) {
    this.form = this.fb.group({
      formName: ['', Validators.required],
      fields: this.fb.array([]),
      selectedFieldType: '' 
    });
  }

  ngOnInit(): void {}

  get fields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  toggleFieldOptions() {
    this.showFieldOptions = !this.showFieldOptions;
  }

  addField(fieldType: string) {
    const newField = this.fb.group({
      type: fieldType,
      label: '',
      textarea: '',
      optionsString: '',
      options: this.fb.array([]),
      selectedOption: '',
      required: false
    });

    this.fields.push(newField);
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  saveForm() {
    if (this.form.valid) {
      const formStructure = {
        formName: this.form.value.formName,
        fields: this.fields.value.map((field: any) => ({
          ...field,
          options: field.optionsString ? field.optionsString.split(',').map((option: string) => option.trim()) : []
        }))
      };
      console.log('Form Data:', formStructure);
      alert('Form saved successfully!');

      this.formBuilderService.saveForm(formStructure)
        .subscribe(response => {
          alert('Form saved successfully!');
        }, error => {
         
        });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
