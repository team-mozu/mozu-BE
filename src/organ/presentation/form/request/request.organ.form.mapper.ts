import { RequestLoginForm } from './request.login.form';
import { RequestOrganForm } from './request.organ.form';
import { OrganDTO } from 'src/organ/common/data/organ.dto';

export class RequestOrganFormMapper {
    async toDTO(form: RequestOrganForm): Promise<OrganDTO> {
        return new OrganDTO(null, form.name, form.code, form.password);
    }

    async loginToDTO(form: RequestLoginForm): Promise<OrganDTO> {
        return new OrganDTO(null, null, form.code, form.password);
    }
}
