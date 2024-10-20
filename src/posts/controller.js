import { postService } from './service.js';

const findAll = async (req, res) => {
  const userId = req.user.id;
  res.status(200).json(await postService.findUserPosts(userId));
};

const findOneById = async (req, res) => {
  const post = await postService.findOneById(+req.params.id);
  if (post.userId != req.user.id) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }
  res.status(200).json({ post });
};

const create = async (req, res) => {
  const post = { ...req.body, userId: req.user.id };
  res.status(201).json(await postService.create(post));
};

const update = async (req, res) => {
  try {
    const { post } = await postService.findOneById(+req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    if (post.dataValues.userId !== req.user.id) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).json({
        error:
          'Este método espera un objeto con las propiedades (title) y (content)',
      });

    res.status(200).json(
      await postService.update(+req.params.id, {
        title,
        content,
        userId: req.user.id,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { post } = await postService.findOneById(+req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    if (post.dataValues.userId !== req.user.id) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    await postService.deletePost(+req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
};

export const postController = {
  findAll,
  findOneById,
  create,
  update,
  deletePost,
};
