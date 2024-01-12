import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) { }
  async create(createPostDto: any) {


    try {
      const images = createPostDto?.images
      delete createPostDto?.images
      const post = await this.prismaService.post.create({ data: createPostDto })
      if (post) {
        const account = await this.prismaService.account.findFirst({ where: { id: post.accountId } })
        await this.prismaService.image.createMany({
          data: images?.map(image => {
            return {
              url: image.data_url,
              postId: post?.id
            }
          })
        })
        return {
          ...post,
          account,
          images: images.map(image => {
            return {
              url: image?.data_url
            }
          })
        }
      }

    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      return await this.prismaService.post.findMany({ include: { account: true, images: true }, orderBy: { id: 'desc' } })
    } catch (error) {

      throw new BadRequestException(error)
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.post.findFirst({
        where: { id }, include: {
          account: true, images: true
        }
      })
    } catch (error) {

      throw new BadRequestException(error)
    }
  }

  async update(id: number, updatePostDto: any) {
    try {
      const imagesList = updatePostDto.images;
      delete updatePostDto.images;
      const post = await this.prismaService.post.update({
        data: updatePostDto,
        where: { id },
        include: {
          account: true
        }
      });
      await this.prismaService.image.deleteMany({
        where: { postId: post.id },
      });
      await this.prismaService.image.createMany({
        data: imagesList.map((image) => {
          return {
            postId: post.id,
            url: image.url,
          };
        }),
      });
      const images = await this.prismaService.image.findMany({
        where: { postId: post.id },
      });

      return {
        images,
        ...post,
      };
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error)
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.post.delete({ where: { id } })
    } catch (error) {

      throw new BadRequestException(error)
    }
  }
}
