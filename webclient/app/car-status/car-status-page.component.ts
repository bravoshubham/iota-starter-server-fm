/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the IBM License, a copy of which may be obtained at:
 *
 * http://www14.software.ibm.com/cgi-bin/weblap/lap.pl?li_formnum=L-DDIN-AEGGZJ&popup=y&title=IBM%20IoT%20for%20Automotive%20Sample%20Starter%20Apps%20%28Android-Mobile%20and%20Server-all%29
 *
 * You may not use this file except in compliance with the license.
 */
import { Component, OnInit } from '@angular/core';

import { CarStatusDataService } from './summary/car-status-data.service';
import { LocationService, MapArea } from '../shared/location.service';

import { RealtimeDeviceDataProviderService } from '../shared/realtime-device-manager.service';

@Component({
  moduleId: module.id,
  selector: 'fmdash-car-status-page',
  templateUrl: 'car-status-page.component.html',
  providers: [CarStatusDataService],
})
export class CarStatusPageComponent implements OnInit {
  regions: MapArea[];
  selectedRegion: MapArea;


  constructor(
    private locationService: LocationService,
    private realtimeDeviceDataProviderService: RealtimeDeviceDataProviderService
  ) {
    this.regions = this.locationService.getRegions().map(x=>x);
  }

  selectRegion(selValue){
    var region = this.regions[parseInt(selValue)];
    // update tracking extent
    this.realtimeDeviceDataProviderService.startTracking(region.extent);
  }


  ngOnInit() {
    if(this.locationService.getMapRegion()){
      this.regions.push(this.locationService.getMapRegion());
      this.selectedRegion = this.regions[this.regions.length - 1];
    }else{
      this.selectedRegion = this.regions[0];
    }
    // initialize tracking
    this.realtimeDeviceDataProviderService.startTracking(this.selectedRegion.extent);
  }
}
