import { Component, ElementRef, ViewChild } from '@angular/core';
import users from 'src/app/config/users';
import { User } from 'src/app/types';

@Component({
  selector: 'mention-users',
  templateUrl: './mention-users.component.html',
  styleUrls: ['./mention-users.component.scss']
})
export class MentionUsersComponent {
  @ViewChild('mentionUserInput') mentionUserInputRef: ElementRef<HTMLSpanElement> | undefined;
  usernames: string[] = users.map((user) => user.username);
  filteredValues: string[] = [];
  highlightedOption = 0;
  selectedUsers: User[] = [];
  showAutocomplete = false;
  inputVal?: string;

  constructor() {
  }

  handleInputChange(event: Event) {
    const value = (event.target as HTMLSpanElement).innerHTML;
    const hasMentionedUsers = value.split(/[\s<br>]+/).filter((word) => /^@/.test(word));

    this.inputVal = value;

    if (!!value && hasMentionedUsers.length > 0) {
      this.showAutocomplete = true;
      this.highlightedOption = 0;
      const currentValue = hasMentionedUsers[0].slice(1);

      this.filteredValues = this.usernames.filter((testValue) => testValue.toLowerCase().includes(currentValue.toLowerCase()));
    } else
      this.showAutocomplete = false;
  }

  handleKeyPress(event: KeyboardEvent) {
    if (!this.showAutocomplete) return;

    switch (event.key) {
      case 'Enter':
        event.preventDefault();

        this.removeMentionedUser();
        this.showAutocomplete = false;

        if (this.filteredValues.length === 0) return;

        // Add the selected user to the list of selected users
        this.selectedUsers.push(users.find((user) => user.username === this.filteredValues[this.highlightedOption])!);

        // Remove the selected user from the list of available usernames
        this.usernames = this.usernames.filter((username) => username !== this.filteredValues[this.highlightedOption]);
        break;
      case 'ArrowUp':
        // Move the highlighted option up
        event.preventDefault();
        this.highlightedOption = this.highlightedOption === 0 ? this.filteredValues.length - 1 : this.highlightedOption - 1;
        break;
      case 'ArrowDown':
        // Move the highlighted option down
        event.preventDefault();
        this.highlightedOption = this.highlightedOption === this.filteredValues.length - 1 ? 0 : this.highlightedOption + 1;
        break;
      default:
        // Handling edge case when the highlighted option is not available anymore
        this.highlightedOption = 0;
    }
  }

  removeMentionedUser() {
    if (this.mentionUserInputRef?.nativeElement.innerText)
      this.mentionUserInputRef.nativeElement.innerText = this.mentionUserInputRef?.nativeElement.innerText.split(' ').filter((word) => !/^@/.test(word)).join(' ');
  }

  focusUserInput(event: MouseEvent) {
    event.preventDefault();
    this.mentionUserInputRef?.nativeElement.focus();
  }

  removeSelectedUser(user: User) {
    this.selectedUsers = this.selectedUsers.filter((selectedUser) => selectedUser.username !== user.username);
    this.usernames.push(user.username);
  }
}
