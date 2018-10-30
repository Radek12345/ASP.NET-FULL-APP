import { Vehicle } from './../../models/Vehicle';
import { KeyValuePair } from './../../models/KeyValuePair';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
@Component({
    templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[] = [];
    makes: KeyValuePair[] = [];
    filter: any = {};

    constructor(private vehicleService: VehicleService) { }

    ngOnInit() {
        this.vehicleService.getMakes()
            .subscribe(makes => this.makes = makes);

        this.populateVehicle();
    }

    private populateVehicle() {
        this.vehicleService.getVehicles(this.filter)
            .subscribe(vehicles => this.vehicles = vehicles);
    }

    onFilterChange() {
        this.populateVehicle();
    }

    resetFilter() {
        this.filter = {};
        this.onFilterChange();
    }
} 