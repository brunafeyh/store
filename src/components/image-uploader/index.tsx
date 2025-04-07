import React, { useRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import styles from './ImageUploader.module.scss';
import { Image, TrashCan } from '@carbon/icons-react';

type ImageUploaderProps = {
    name: string;
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ name }) => {
    const { control } = useFormContext();
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[]}
            render={({ field: { value, onChange } }) => {
                const handleFiles = (files: FileList | null) => {
                    if (!files) return;
                    const fileArray = Array.from(files);
                    onChange([...(value || []), ...fileArray]);
                };

                const handleRemove = (index: number) => {
                    const updated = [...value];
                    updated.splice(index, 1);
                    onChange(updated);
                };

                return (
                    <div className={styles.container}>
                        <div
                            className={styles.uploadArea}
                            onClick={() => inputRef.current?.click()}
                        >
                            <Image className={styles.uploadIcon} />
                            <p>Escolha imagens ou arraste para cá</p>
                            <span>Formatos aceitos: JPEG, PNG. Máx: 5MB</span>
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                onChange={(e) => handleFiles(e.target.files)}
                            />
                        </div>

                        {value?.length > 0 && (
                            <div className={styles.fileList}>
                                {value.map((file: File, index: number) => (
                                    <div key={index} className={styles.fileItem}>
                                        <div className={styles.fileInfo}>
                                            <Image className={styles.fileIcon} />
                                            <span className={styles.fileName}>{file.name}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemove(index)}
                                            className={styles.removeButton}
                                        >
                                            <TrashCan size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
};
