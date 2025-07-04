import { Component, inject } from '@angular/core';
import { CharacterComponent } from '../../elementos/character/character.component';
import { Character } from '../../interfaces/character';
import { CharacterService } from '../../servicios/character.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [CommonModule, FormsModule, CharacterComponent],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.scss'
})


export class PersonajesComponent {
  ListadoPersonajes: Character[] = [];
  searchText = '';
  status = '';
  species = '';
  gender = '';
  isLoading = false;
  errorMessage = '';

  characterService: CharacterService = inject(CharacterService);

  constructor(private router: Router) {
    this.cargarPersonajes();
  }

  irAgregarPersonaje() {
    this.router.navigate(['/agregar-personaje']);
  }

  cargarPersonajes(filtros?: { [key: string]: string }) {
    this.isLoading = true;
    const servicio = filtros
      ? this.characterService.obtenerPersonajesFiltrados(filtros)
      : this.characterService.obtenerPersonajes();

    servicio.subscribe({
      next: (data) => {
        this.ListadoPersonajes = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar personajes';
        this.isLoading = false;
      }
    });
  }

  aplicarFiltro() {
    const filtros: { [key: string]: string } = {};
    if (this.searchText) filtros['name'] = this.searchText;
    if (this.status) filtros['status'] = this.status;
    if (this.species) filtros['species'] = this.species;
    if (this.gender) filtros['gender'] = this.gender;

    this.cargarPersonajes(filtros);
  }
}
