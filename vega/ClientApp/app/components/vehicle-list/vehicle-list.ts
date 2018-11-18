import { Vehicle } from './../../models/Vehicle';
import { KeyValuePair } from './../../models/KeyValuePair';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
    templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {
    private readonly PAGE_SIZE = 3;
    queryResult: any = {};
    makes: KeyValuePair[] = [];
    query: any = {
        pageSize: this.PAGE_SIZE
    };
    columns = [
        { title: 'Id' },
        { title: 'Contact Name', key: 'contactName', isSortable: true },
        { title: 'Make', key: 'make', isSortable: true },
        { title: 'Model', key: 'model', isSortable: true },
        { }
    ];

    constructor(private vehicleService: VehicleService, private auth: AuthService) { }

    ngOnInit() {
        this.vehicleService.getMakes()
            .subscribe(makes => this.makes = makes);

        this.populateVehicles();
    }

    private populateVehicles() {
        this.vehicleService.getVehicles(this.query)
            .subscribe(result => this.queryResult = result);
    }

    onFilterChange() {
        this.query.page = 1;
        this.populateVehicles();
    }

    resetFilter() {
        this.query = {
            page: 1,
            pageSize: this.PAGE_SIZE
        };

        this.populateVehicles();
    }

    sortBy(columnName: string) {
        this.query.sortBy = columnName;
        this.query.isSortAscending = !this.query.isSortAscending;
        this.populateVehicles();
    }

    onPageChange(page: number) {
        this.query.page = page; 
        this.populateVehicles();
    }

} 