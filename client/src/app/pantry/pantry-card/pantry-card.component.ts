import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pantry } from '../pantry';
import { PantryService } from '../pantry.service';

@Component({
  selector: 'app-pantry-card',
  templateUrl: './pantry-card.component.html',
  styleUrls: ['./pantry-card.component.scss']
})
export class PantryCardComponent implements OnInit {

  @Input() pantry: Pantry;
  @Input() simple ? = false;

  constructor(private pantryService: PantryService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  removePantry(pantry: Pantry){
    this.pantryService.removePantry(pantry).subscribe(newID => {
      ;
      this.router.navigate([]);
      this.snackBar.open('Removing item ' + pantry.name+' from Pantry', null, {
        duration: 2000,
      });
    });
  }


  }

