import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Event, ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[] = []; 
  models: any[] = [];
  features: any[] = [];

  vehicle: any = {
    features: [],
    contact: {}
  };
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService) { 
      route.params.subscribe(p => {
        this.vehicle.id = +p['id'];
      })
    }

  ngOnInit() {
    if (this.vehicle.id > 0) {
      this.vehicleService.getVehicle(this.vehicle.id)
        .subscribe(v => {
          this.vehicle = v;
        }, err => {
          if (err.status == 404)
            this.router.navigate(['/home']);
        });
    }

    this.vehicleService.getMakes().subscribe(makes => 
      this.makes = makes);

    this.vehicleService.getFeatures().subscribe(features => {
      this.features = features;
    });
  }

  onMakeChange() {
    let selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId: number, $event: any) {
    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      let index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    this.vehicleService.create(this.vehicle)
      .subscribe(x => console.log(x));
  }
}