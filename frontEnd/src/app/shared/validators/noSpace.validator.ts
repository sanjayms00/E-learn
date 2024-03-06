import { FormControl } from "@angular/forms";

export const noSpaceAllowed = (control: FormControl) => {

    if (control.value.trim() === '') {
        return { noSpaceAllowed: true }
    }

    return null

}

