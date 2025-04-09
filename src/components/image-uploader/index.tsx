import React, { useRef, useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import styles from './ImageUploader.module.scss';
import { Image, TrashCan } from '@carbon/icons-react';
import { LocalFile } from '../../types/image';
import { convertFileToBase64, estimateBase64Size, extractBase64Type, formatSize } from '../../utils/image';

type ImageUploaderProps = {
    name: string;
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ name }) => {
    const { control } = useFormContext();
    const inputRef = useRef<HTMLInputElement>(null);
    const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[]}
            render={({ field: { value, onChange } }) => {
                useEffect(() => {
                    if (value?.length && localFiles.length === 0) {
                        const defaultConverted: LocalFile[] = value.map((base64: string, index: number) => ({
                            name: `Imagem ${index + 1}`,
                            size: estimateBase64Size(base64),
                            type: extractBase64Type(base64),
                            base64,
                        }));
                        setLocalFiles(defaultConverted);
                    }
                }, [value]);

                const handleFiles = async (files: FileList | null) => {
                    if (!files) return;
                    const fileArray = Array.from(files);
                    const converted = await Promise.all(fileArray.map(convertFileToBase64));
                    setLocalFiles((prev) => [...prev, ...converted]);
                    const base64Array = converted.map((file) => file.base64);
                    onChange([...(value || []), ...base64Array]);
                };

                const handleRemove = (index: number) => {
                    const updatedBase64 = [...value];
                    const updatedLocal = [...localFiles];
                    updatedBase64.splice(index, 1);
                    updatedLocal.splice(index, 1);
                    onChange(updatedBase64);
                    setLocalFiles(updatedLocal);
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

                        {localFiles.length > 0 && (
                            <div className={styles.fileList}>
                                {localFiles.map((file, index) => (
                                    <div key={index} className={styles.fileItem}>
                                        <div className={styles.fileInfo}>
                                            <Image className={styles.fileIcon} />
                                            <div>
                                                <span className={styles.fileName}>{file.name}</span><br />
                                                <small>{file.type} — {formatSize(file.size)}</small>
                                            </div>
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
                )
            }}
        />
    )
}
