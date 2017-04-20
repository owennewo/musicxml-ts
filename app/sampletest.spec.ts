describe('Sample Test', () => {
 it('true is true', () => expect(true).toBe(true));
});

import {AppComponent} from './app.component';

describe('AppComponent', () => {
 beforeEach(function() {
   this.app = new AppComponent();
 });

 it('should have hello property', function() {
   expect(this.app.hello).toBe('Hello, World!');
 });
});
