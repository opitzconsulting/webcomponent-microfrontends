import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RemoteWebComponentComponent } from './remote-web-component/remote-web-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RemoteWebComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'main';

  protected count = 0

}
