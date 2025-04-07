import { useForm, FormProvider } from 'react-hook-form';
import { ImageUploader } from '../../image-uploader';

export const ImageForm = () => {
    const methods = useForm()

    const onSubmit = (data: any) => {
        console.log(data.images)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                <ImageUploader name="images" />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Enviar
                </button>
            </form>
        </FormProvider>
    )
}
