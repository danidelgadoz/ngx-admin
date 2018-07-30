import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login/login.service';
import { FileService } from '../dashboard/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ToggleSidenavDemo = true;
  SidenavFixedState = false;
  fileArray: any[];

  constructor(
    private loginService: LoginService,
    private fileService: FileService,
    private router: Router
  ) { }

  public static path(): string[] {
    return ['dashboard'];
  }

  ngOnInit() {
  }

  private logout(): void {
    this.loginService
        .logout()
        .subscribe(() => {
            this.router.navigate(['login']);
        });
}

  filesLoaded() {
    console.log(this.fileArray);

    const formData = new FormData();
    formData.append('publicado', '0');
    formData.append('titulo', 'Lorem Ipsum');
    formData.append('inner_html', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ');
    formData.append('featured', '0');
    formData.append('feature_image', this.fileArray[0]);

    for (let x = 0; x < this.fileArray.length; x++) {
      formData.append('images_list[]', this.fileArray[x]);
    }

    this.fileService
      .login(formData)
      .subscribe(
        data => {
          console.log('data', data);
        },
        error => {
        }
      );
  }

}
