import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user/user";
import {UserService} from "../../../services/user/user.service";
import {LocalStorageService} from "../../../services/local-storage/local-storage.service";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    @Input() user!: User;

    constructor(
        private userService: UserService,
        private localStorageService: LocalStorageService,
        private loggerService: LoggerService
    ) {
    }

    ngOnInit(): void {
        this.userService.getProfile().subscribe({
            next: (data) => {
                this.user = JSON.parse(JSON.stringify(data));
            },
            error: (err) => {
                this.loggerService.displayError(`Error: ${err.error.message}`);
            }
        });
    }

    logout() {
        this.userService.logout();
    }

}
