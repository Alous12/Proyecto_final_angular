import { Component } from '@angular/core';
import { CharacterService } from '../../servicios/character.service';
import { Router } from '@angular/router';
import { Character } from '../../interfaces/character';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-personaje',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-personaje.component.html',
  styleUrl: './agregar-personaje.component.scss'
})
export class AgregarPersonajeComponent {
  character: Partial<Character> = {
    name: '',
    status: '',
    species: '',
    gender: '',
    image: '',
    /*origin: { name: '', url: '' },      // Ensure these are always objects
    location: { name: '', url: '' },    // Ensure these are always objects
    <input [(ngModel)]="character.origin.name" name="origin" placeholder="Origen" />
    <input [(ngModel)]="character.location.name" name="location" placeholder="Ubicación" /> */
    episodes: [],
    url: '',
    created: new Date()
  };
  isLoading = false;
  errorMessage = '';

  constructor(private characterService: CharacterService, private router: Router) {}

  agregarPersonaje() {
    this.isLoading = true;
     this.characterService.crearPersonaje(this.character as Character).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/personajes']);
      },
      error: () => {
        this.errorMessage = 'Error al agregar personaje';
        this.isLoading = false;
      }
    });
  }
}