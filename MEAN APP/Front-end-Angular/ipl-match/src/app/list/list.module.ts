import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { RouterModule } from '@angular/router';
import { ListrouteguardService } from './listrouteguard.service';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminComponent } from './admin/admin.component';
import { TeamstatsComponent } from './teamstats/teamstats.component';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { FormsModule } from '@angular/forms';

/*angular material*/
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [MatchListComponent, MatchDetailsComponent, AdminComponent, TeamstatsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    RouterModule.forChild([ 
      { path: 'List', component: MatchListComponent,canActivate:[ListrouteguardService] },
      { path: 'Listdetail/:id', component: MatchDetailsComponent,canActivate:[ListrouteguardService] },
      { path: 'admin', component: AdminComponent,canActivate:[ListrouteguardService] },
      { path: 'teamstats', component: TeamstatsComponent,canActivate:[ListrouteguardService] }
    ])
  ],
  providers:[ListrouteguardService]
})
export class ListModule { }
