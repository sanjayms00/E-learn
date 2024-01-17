export interface videoInterface {
    _id: string,
    instructorId: string,
    index: number,
    title: string,
    description: string,
    file: string,
    createdAt: Date,
    updatedAt: Date,
    videoUrl ?: string
}