import { NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-remote-web-component',
  standalone: true,
  imports: [NgIf],
  templateUrl: './remote-web-component.component.html',
  styleUrl: './remote-web-component.component.scss'
})
export class RemoteWebComponentComponent implements OnInit, OnChanges {

  @Input({ required: true }) moduleAddress!: string
  @Input() styleAddress!: string
  @Input({ required: true }) name!: string

  @Input({ required: true}) count!: number
  @Output() countUpdated = new EventEmitter<number>()

  protected error: string | undefined

  @ViewChild('child') declare child: ElementRef;
  private webcomponent?: HTMLElement

  public ngOnInit(): void {
    this.fetchModule()
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if(typeof this.webcomponent === "undefined") {
      return // too early
    }
    console.log(changes)

    if( "count" in changes) {
      const {previousValue, currentValue} = changes["count"];
      if (previousValue == currentValue) {
        return
      }

      // @ts-ignore
      this.webcomponent.count = currentValue
      // @ts-ignore

      this.webcomponent.render()

    }
  }



  protected async fetchModule() {
    try {
      const module = (await import( /* @vite-ignore */ this.moduleAddress)) as {default: (name: string) => void, stylesUrl: string};
      this.error = undefined

      module.default(this.name)

      this.child.nativeElement.innerHTML = ""
      this.webcomponent = document.createElement(this.name)

      if(this.styleAddress) {
        // @ts-ignore
        this.webcomponent.styleAddress = this.styleAddress;
      }

      // @ts-ignore
      this.webcomponent.count = this.count;

      this.webcomponent.addEventListener("count-updated", (event) => {
        // @ts-ignore
        this.countUpdated.emit(event.detail)
      })

      this.child.nativeElement.appendChild(this.webcomponent)
    }
    catch(err) {
      console.error(err)
      this.error = String(err)
    }
  }



}
