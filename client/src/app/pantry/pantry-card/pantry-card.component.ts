import { Component, OnInit, Input } from '@angular/core';
import { Pantry } from '../pantry';

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

  removePantry(pantry: pantry){
    this.pantryService.removePantry(pantry).subscribe(newID => {
      this.snackBar.open('removing item ' + pantry.name+' from Pantry', null, {
        duration: 2000,
      });
      this.router.navigate([]);
    }, err => {
      this.snackBar.open('Failed to remove the item', 'OK', {
        duration: 5000,
      });
    });
  }


  }

}
