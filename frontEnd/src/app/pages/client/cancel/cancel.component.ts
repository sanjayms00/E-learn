import { Component } from '@angular/core';

@Component({
  selector: 'app-cancel',
  template: `
      <div class="bg-gray-100 py-10 flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-md max-w-md w-full">
            <h2 class="text-3xl font-semibold text-red-600 mb-4">Order Failed</h2>
            <p class="text-gray-700 mb-6">Unfortunately, your order could not be processed at this time.</p>
            <a [routerLink]="'/home'" class="text-white bg-black hover:bg-gray-600 cursor-pointer py-2 px-4 rounded-md inline-block">
                Back to Home
            </a>
        </div>
      </div>`
})
export class CancelComponent {

}
