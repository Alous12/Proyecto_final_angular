import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../../servicios/character.service';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'app-editar-personaje',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-personaje.component.html',
  styleUrl: './editar-personaje.component.scss'
})
export class EditarPersonajeComponent {
  personaje: Character | undefined;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService
  ) {
    this.id = Number(this.route.snapshot.params['id']);
    this.cargarPersonaje();
  }

  cargarPersonaje() {
    this.characterService.obtenerPersonajePorId(this.id).subscribe({
      next: (data) => this.personaje = data,
      error: () => alert('No se pudo cargar el personaje')
    });
  }

  guardar() {
    if (!this.personaje) return;
    this.characterService.actualizarPersonaje(this.id, this.personaje).subscribe({
      next: () => this.router.navigate(['/personajes']),
      error: () => alert('Error al actualizar personaje')
    });
  }

  eliminar() {
    if (!confirm('¿Seguro que deseas eliminar este personaje?')) return;
    this.characterService.eliminarPersonaje(this.id).subscribe({
      next: () => this.router.navigate(['/personajes']),
      error: () => alert('Error al eliminar personaje')
    });
  }
}