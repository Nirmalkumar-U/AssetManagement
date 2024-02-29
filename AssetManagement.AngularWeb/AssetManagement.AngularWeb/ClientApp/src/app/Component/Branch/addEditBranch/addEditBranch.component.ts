import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndexedDbService } from '../../../core/indexedDbservices/indexedDb.service';
import { BranchService } from '../../../core/services/branch.service';
import { SyncBranchDto } from '../../../core/dtos/SyncBranchDto';

@Component({
  selector: 'app-addEditBranch',
  templateUrl: './addEditBranch.component.html',
})
export class AddEditBranchComponent {
  branchForm: FormGroup = new FormGroup({});
  isDisableSync: boolean = true;
  isOnline: boolean = true;
  branchList: SyncBranchDto[] = [];
  count: number = 0;
  constructor(private formBuilder: FormBuilder, private indexedDbService: IndexedDbService, private branchService: BranchService) { }

  ngOnInit(): void {
    this.branchForm = this.formBuilder.group({
      branchId: [null],
      branchName: [null, Validators.required],
      branchCode: [null, Validators.required],
      city: [null],
      state: [null]
    });
    this.indexedDbService.initDb().then(() => {
    });
    if (this.isOnline) {
      this.branchService.getAllBranches().subscribe((response: any) => {

      });
    }
  }

  onOnlineChange(isOnline: boolean) {
    this.isOnline = isOnline;
    if (isOnline) {
      let data = this.branchList.length;
      this.isDisableSync = data == 0;
    } else {
      this.clearAll();
      this.branchList = [];
      this.isDisableSync = true;
    }
  }

  saveBranch() {
    //validate
    if (this.isOnline) {
      indexedDB.deleteDatabase('Branch');
      //this.deleteDatabase();
    } else {
      this.addBranch();
    }
  }
  loadData(): void {
    this.indexedDbService.getAllData().then((result) => {
      this.branchList = result;
    });
  }

  addBranch(): void {
    let value: SyncBranchDto = this.branchForm.value;
    const newData = { branchName: value.branchName, branchCode: value.branchCode, city: value.city, state: value.state };
    this.count++;
    this.indexedDbService.addData(newData).then(() => {
      this.loadData();
    });
  }

  updateData(): void {
    const dataToUpdate = { id: 1, branchName: 'John Doe' + this.count, branchCode: 'code' + this.count, city: 'City' + this.count, state: 'state' + this.count };
    this.indexedDbService.updateData(dataToUpdate).then(() => {
      this.loadData();
    });
  }

  deleteData(branchId: number): void {
    this.indexedDbService.deleteData(branchId).then(() => {
      this.loadData();
    });
  }
  clearAll(): void {
    this.indexedDbService.clearAllData().then(() => {
      this.loadData();
    });
  }
  deleteDatabase() {
    const databaseName = 'Branch';

    this.indexedDbService.deleteDatabase(databaseName)
      .then(() => {
        console.log('Database deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting database:', error);
      });
  }
}
