import { Pipe,PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'

@Pipe({ name: "safeHtml" })
export class SafeHtml implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html) {
    console.log("paso por el pipe");
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}