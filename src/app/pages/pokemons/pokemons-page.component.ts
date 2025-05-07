import {
  ApplicationRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
})
export default class PokemonsPageComponent implements OnInit {
  private pokemonsService = inject(PokemonsService);
  pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );
  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) =>
  //   console.log({ isStable })
  // );

  ngOnInit(): void {
    this.loadPokemons();
    // setTimeout(() => {}, 5000);
  }

  public loadPokemons(page: number = 0) {
    const pageToLoad = this.currentPage()! + page;

    // console.log({ pageToLoad });

    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() =>
          this.router.navigate([], { queryParams: { page: pageToLoad } })
        ),
        tap(() => {
          this.title.setTitle(`Pokemon SSR - Page ${pageToLoad}`);
        })
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
        console.log(pokemons);
      });
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }
}
