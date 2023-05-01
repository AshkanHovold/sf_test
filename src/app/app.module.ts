import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SourceInputComponent } from './components/source-input/source-input.component';
import { SourceOutputComponent } from './components/source-output/source-output.component';
import { StartComponent } from './pages/start/start.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    SourceInputComponent,
    SourceOutputComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
